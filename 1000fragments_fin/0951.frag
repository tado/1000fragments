uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.07;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.65)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.96 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.82) * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.48 / 3.1415927, 1.28 / r - (time * 0.82) * 1.44);
	float d = field(tv, (time * 0.82), 0.0);
	vec3 col = palette((d) * 0.56 + (time * 0.82) * 0.05, vec3(0.56, 0.47, 0.39), vec3(0.27, 0.25, 0.23), vec3(1.05, 0.97, 0.95), vec3(-0.02, 0.08, 0.27));
	col *= clamp(r * 2.41, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.015, 0.978, 0.958);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
