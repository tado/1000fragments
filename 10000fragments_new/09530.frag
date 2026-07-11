uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.50);
    float gsh = hash21(vec2(grow, floor(t * 7.27))) - 0.5;
    float gx = p.x + gsh * 0.36;
    v = sin(gx * 16.94 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.21));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.64; vec2 jc = vec2(-0.52 + 0.3 * sin(t * 1.00 + ph), 0.49 + 0.3 * cos(t * 1.07 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 30; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 30.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.65);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.78));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.07, 0.45), vec3(0.69, 0.82, 0.49), cc);
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
