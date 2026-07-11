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
    vec2 zp = p * 7.75;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.68)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 14.07 - t * 5.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p += vec2(sin((time * 0.52) * 0.74), cos((time * 0.52) * 0.32)) * 0.13;
	p += vec2(sin((time * 0.52) * 0.42), cos((time * 0.52) * 1.14)) * 0.10;
	float an = atan(p.y, p.x) + (time * 0.52) * -0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.67 / 3.1415927, 1.19 / r - (time * 0.52) * 2.77);
	float d = field(tv, (time * 0.52), 0.0);
	vec3 col = palette((d) * 0.43 + (time * 0.52) * 0.15, vec3(0.28, 0.29, 0.23), vec3(0.18, 0.27, 0.22), vec3(0.73, 0.62, 0.65), vec3(0.17, 0.23, 0.59));
	col *= clamp(r * 1.17, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.949, 1.021) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
