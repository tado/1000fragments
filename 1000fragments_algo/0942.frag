uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.12; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.27 - t * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p = p.yx;
	float an = atan(p.y, p.x) + (time * 0.56) * -0.37;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.83 / 3.1415927, 1.43 / r - (time * 0.56) * 2.13);
	float d = field(tv, (time * 0.56), 0.0);
	vec3 col = palette((d) * 0.79 + (time * 0.56) * 0.07, vec3(0.47, 0.42, 0.51), vec3(0.17, 0.14, 0.17), vec3(0.51, 0.46, 0.89), vec3(0.02, 0.32, 0.06));
	col *= clamp(r * 1.84, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.955, 0.991, 0.935) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
