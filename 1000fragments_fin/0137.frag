uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.85 + 0.15 * sin(t * 1.01)) + vec2(-0.51, -0.16) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 28; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 28.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.05 - t * 1.33;
    v = sin(floor(lv * 3.5) / 3.5 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.07 + (time * 0.79) * 1.28) * 0.13;
	p.y = abs(p.y) - 0.48;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.40 + (time * 0.79) * -0.61); }
	float d1 = field(p, (time * 0.79), 0.0);
	float d2 = field2(p, (time * 0.79), 0.75);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.79 + (time * 0.79) * 0.25, vec3(0.49, 0.52, 0.49), vec3(0.51, 0.53, 0.53), vec3(0.98, 0.97, 0.98), vec3(0.04, 0.30, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.70));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.962, 1.022, 0.953);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
