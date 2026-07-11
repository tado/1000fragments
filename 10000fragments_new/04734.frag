uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.30; vec2 jc = vec2(-0.66 + 0.3 * sin(t * 1.56 + ph), -0.70 + 0.3 * cos(t * 0.76 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.24);
    float gsh = hash21(vec2(grow, floor(t * 3.36))) - 0.5;
    float gx = p.x + gsh * 1.10;
    v = sin(gx * 8.41 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.50));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(0.17, 0.56) * sin(length(q2) * 5.34 - time * 2.25) * 0.24;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.30);
	float d = d1 * d2;
	vec3 col = palette(d * 0.64 + time * 0.22, vec3(0.44, 0.44, 0.53), vec3(0.39, 0.49, 0.42), vec3(0.96, 1.36, 1.38), vec3(0.21, 0.92, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
