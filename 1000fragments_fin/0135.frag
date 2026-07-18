uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.81;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 14.29 - t * 5.46 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.41 + (time * 0.78) * 1.11) * 0.16;
	p *= 2.22;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.35; p = rot2(2.14) * p; }
	p = rot2(2.67) * p;
	p *= 2.86;
	float d = 0.5 + 0.5 * field(p, (time * 0.78), 0.0);
	vec3 col = mix(vec3(0.105, 0.079, 0.175), vec3(0.674, 0.980, 0.804), d);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.962, 1.017, 0.942);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
