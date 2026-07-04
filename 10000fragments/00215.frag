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
    vec2 mc = p * (1.66 + 0.36 * sin(t * 0.92)) + vec2(-0.61, 0.29) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.33; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.61 - t * 1.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.91));
	{ float fr = length(p); p *= 1.0 + -0.43 * fr * fr; }
	p = rot2(length(p) * -1.62 + time * 0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.94 + time * 0.24, vec3(0.44, 0.59, 0.59), vec3(0.47, 0.34, 0.34), vec3(0.80, 1.31, 1.27), vec3(0.19, 0.72, 0.45));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
