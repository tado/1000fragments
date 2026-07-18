uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	vec2 q = p * 3.29 + vec2(2.29, 5.55);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 8.84) > 0.61) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 6.74);
	float ftn = 0.5 + 0.5 * sin((time * 0.86) * 1.50 + h * 6.2831853);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.49 + (time * 0.86) * 0.21, vec3(0.73, 0.63, 0.61), vec3(0.27, 0.25, 0.18), vec3(1.04, 0.96, 0.97), vec3(0.94, 0.05, 0.09));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.467, 0.482, bd);
	col = mix(col, vec3(0.00, 0.01, 0.08), edge * 0.90);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.988, 1.012, 0.987);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
