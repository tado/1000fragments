uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.29;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.16)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.23 - t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.78) * 0.97), cos((time * 0.78) * 1.30)) * 0.26;
	float an = atan(p.y, p.x) + (time * 0.78) * -0.59;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.86 / 3.1415927, 1.04 / r - (time * 0.78) * 1.99);
	tv.x += tv.y * 0.25;
	float d = field(tv, (time * 0.78), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.054, 0.071, 0.083), vec3(0.908, 0.896, 0.872), cc);
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.981, 0.999, 0.949);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
