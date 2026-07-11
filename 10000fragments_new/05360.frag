uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.01; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 15.65 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.22, vec3(0.51, 0.54, 0.50), vec3(0.40, 0.47, 0.32), vec3(0.88, 1.31, 0.79), vec3(0.25, 0.09, 0.87));
	col *= 0.81 + 0.11 * sin(gl_FragCoord.y * 1.71 + time * 6.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
