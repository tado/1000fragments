uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.85 + t * 2.39 + ph) + sin(p.y * 17.00 - t * 0.84 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.67 + 0.3 * sin(t * 0.58 + ph), -0.68 + 0.3 * cos(t * 0.84 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 18; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 18.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	vec2 q1 = p; vec2 q2 = p;
	q2 = (floor(q2 * 8.8) + 0.5) / 8.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.57);
	float d = d1 * d2;
	vec3 col = hue(d * 0.67 + time * 0.35);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
