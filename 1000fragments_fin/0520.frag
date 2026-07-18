uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.33 + (time * 0.67) * 1.04) * 0.11;
	p.x += p.y * 0.45;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	vec2 q = p * 2.58 + vec2(8.47, 2.04);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 7.30) > 0.75) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.41);
	float rr = 0.23 + 0.07 * sin((time * 0.67) * 1.82 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.72 + (time * 0.67) * 0.25, vec3(0.36, 0.45, 0.53), vec3(0.31, 0.30, 0.28), vec3(1.04, 0.94, 0.82), vec3(0.33, 0.47, 0.63));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.446, 0.461, bd);
	col = mix(col, vec3(0.16, 0.17, 0.14), edge * 0.87);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.986, 1.012, 0.993);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
