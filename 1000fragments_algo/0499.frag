uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.50 + 0.18 * sin(t * 0.95)) + vec2(-0.56, 0.14) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.14) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.59 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.78;
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.47 / wf * sin(wf * 3.83 * q2.y + (time * 0.58) * 0.75); q2.y += 0.44 / wf * cos(wf * 3.47 * q2.x + (time * 0.58) * 1.50); }
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.54; q2 = rot2(0.45) * q2; }
	float d1 = fieldA(q1, (time * 0.58), 0.0);
	float d2 = fieldB(q2, (time * 0.58), 0.82);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.16, 0.14), vec3(0.70, 0.67, 0.64), smoothstep(0.0, 1.0, cc));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.58)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.994, 1.049) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
