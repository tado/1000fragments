uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.39;
	p *= 1.80;
	vec2 gp = p * 2.15;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 21.98 - (time * 0.62) * 4.50 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.87 + (time * 0.62) * 0.21, vec3(0.27, 0.37, 0.25), vec3(0.25, 0.26, 0.15), vec3(1.04, 0.96, 1.04), vec3(0.09, 0.17, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.987, 1.013, 0.957);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
