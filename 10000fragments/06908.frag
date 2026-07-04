uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.74; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.49 - t * 1.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 2.64 - time * 0.23); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.10, vec3(0.42, 0.48, 0.49), vec3(0.34, 0.33, 0.48), vec3(1.23, 0.85, 1.27), vec3(0.71, 0.31, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
