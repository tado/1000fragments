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
    vec2 tp = p * 3.33; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.28 - t * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	p *= 1.0 + 0.17 * sin(time * 1.11);
	p = rot2(1.47) * p;
	p = fract(p * 1.49) - 0.5;
	p *= 2.79;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.53 + time * 0.05, vec3(0.59, 0.58, 0.44), vec3(0.32, 0.48, 0.48), vec3(1.16, 1.09, 0.77), vec3(0.71, 1.00, 0.68));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
