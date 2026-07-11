uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.69; vec2 jc = vec2(-0.12 + 0.3 * sin(t * 1.05 + ph), -0.15 + 0.3 * cos(t * 1.62 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 25.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.06);
    float gsh = hash21(vec2(grow, floor(t * 7.00))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 16.38 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.05));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.76 + t * 2.10 + ph) + sin(p.y * 5.96 - t * 2.10 + ph)
        + sin((p.x + p.y) * 9.81 + t * 2.10 + ph) + sin(length(p) * 11.44 - t * 2.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = abs(q1) - 0.62;
	q1 = rot2(q1.y * 1.51 + time * 0.78) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d3 = fieldC(q3, time, 1.44);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.12 + time * 0.40, vec3(0.42, 0.53, 0.46), vec3(0.42, 0.44, 0.37), vec3(1.07, 0.99, 1.39), vec3(0.09, 0.38, 0.10));
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 0.81 + time * 11.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
