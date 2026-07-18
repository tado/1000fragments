uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.92);
    float gsh = hash21(vec2(grow, floor(t * 9.89))) - 0.5;
    float gx = p.x + gsh * 0.84;
    v = sin(gx * 14.62 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.46));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.74) * 1.37), cos((time * 0.74) * 0.44)) * 0.24;
	float an = atan(p.y, p.x) + (time * 0.74) * 0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.59 / 3.1415927, 0.48 / r - (time * 0.74) * 2.55);
	float d = field(tv, (time * 0.74), 0.0);
	vec3 col = vec3(0.844, 0.930, 0.652) * (0.07 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.47, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.024, 0.993, 0.937);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
