uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.47; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 27.24 - t * 0.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.31), cos(time * 0.44)) * 0.15;
	float an = atan(p.y, p.x) + time * -0.67;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.90 / 3.1415927, 1.43 / r + time * 1.01);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.21, vec3(0.40, 0.43, 0.54), vec3(0.42, 0.49, 0.42), vec3(1.24, 1.37, 0.71), vec3(0.39, 0.12, 0.10));
	col *= clamp(r * 1.94, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.71 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
