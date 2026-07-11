uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.16;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.91)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.86 - t * 3.02 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.52) * 0.68), cos((time * 0.52) * 1.49)) * 0.10;
	float an = atan(p.y, p.x) + (time * 0.52) * 0.45;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 0.85 / r - (time * 0.52) * 1.70);
	float d = field(tv, (time * 0.52), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.11, 0.05), vec3(0.51, 0.51, 0.52), smoothstep(0.0, 1.0, cc));
	col *= clamp(r * 1.82, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.924, 0.969, 1.048) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
