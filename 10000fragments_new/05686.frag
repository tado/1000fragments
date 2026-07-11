uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.86; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 14.37 - t * 3.43 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.89;
	p = rot2(p.y * -1.54 + time * 0.63) * p;
	p = abs(p) - 0.60;
	p *= 1.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.25, vec3(0.43, 0.45, 0.60), vec3(0.46, 0.34, 0.38), vec3(1.01, 0.85, 0.80), vec3(0.37, 0.81, 0.09));
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 2.86 + time * 17.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
