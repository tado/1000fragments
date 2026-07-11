uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.47);
    float gsh = hash21(vec2(grow, floor(t * 2.17))) - 0.5;
    float gx = p.x + gsh * 0.43;
    v = sin(gx * 9.39 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.53));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.81; vec2 jc = vec2(-0.44 + 0.3 * sin(t * 1.18 + ph), -0.16 + 0.3 * cos(t * 0.70 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 37; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 37.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = fract(q2 * 2.43) - 0.5;
	q2 = (floor(q2 * 16.9) + 0.5) / 16.9;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.50);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.55));
	vec3 col = hue(d * 1.43 + time * 0.24);
	col = mod(col * 1.36, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
