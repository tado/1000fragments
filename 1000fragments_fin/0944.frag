uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.36);
    float gsh = hash21(vec2(grow, floor(t * 6.03))) - 0.5;
    float gx = p.x + gsh * 1.01;
    v = sin(gx * 14.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.71));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.55) * 0.38), cos((time * 0.55) * 0.64)) * 0.08;
	p += vec2(sin((time * 0.55) * 0.57), cos((time * 0.55) * 0.65)) * 0.11;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.20 / 3.1415927, 0.46 / r - (time * 0.55) * 0.60);
	tv.x += tv.y * 0.30;
	float d = field(tv, (time * 0.55), 0.0);
	vec3 col = vec3(0.888, 0.968, 0.643) * (0.09 / (abs((d)) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 1.47, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.020, 0.971, 0.940);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
