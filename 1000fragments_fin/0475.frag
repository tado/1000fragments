uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.22 + ph), sin(lt * 2.0 + t * 0.31)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.08) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.33) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.23 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.81 + 0.48 * sin(t * 0.66)) + vec2(-0.60, -0.17) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 20; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 20.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.45;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.31 * sin((time * 0.56) * 2.13);
	q2 = sin(q2 * 2.70 + (time * 0.56) * 0.99) * 1.37;
	q2 = (floor(q2 * 17.8) + 0.5) / 17.8;
	q3 = fract(q3 * 2.94) - 0.5;
	q3.y += sin(q3.x * 3.57 + (time * 0.56) * 2.46) * 0.18;
	float d1 = fieldA(q1, (time * 0.56), 0.0);
	float d2 = fieldB(q2, (time * 0.56), 0.64);
	float d3 = fieldC(q3, (time * 0.56), 0.86);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette((d) * 0.99 + (time * 0.56) * 0.04, vec3(0.48, 0.52, 0.49), vec3(0.53, 0.52, 0.48), vec3(0.98, 1.02, 0.96), vec3(-0.01, 0.35, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.985, 1.013, 0.991);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
