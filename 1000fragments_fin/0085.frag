uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.57) * -0.41) * p;
	vec2 gp = p * 5.05;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 16.45 - (time * 0.57) * 6.58 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.49 + (time * 0.57) * 0.09, vec3(0.77, 0.63, 0.62), vec3(0.23, 0.23, 0.21), vec3(0.99, 1.02, 0.97), vec3(0.93, 0.03, 0.13));
	col *= 0.51 + 0.50 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.989, 1.002, 0.936);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
