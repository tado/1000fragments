uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 6.57; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.51 - t * 1.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.29, vec3(0.50, 0.58, 0.51), vec3(0.43, 0.45, 0.38), vec3(1.38, 1.05, 0.71), vec3(0.61, 0.36, 0.38));
	col = fract(col * 1.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
