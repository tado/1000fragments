uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.11 * cos(sa * 6 + t * 0.79 + ph);
    v = sin((sr - petal) * 8.66);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.48; vec2 jc = vec2(-0.67 + 0.3 * sin(t * 0.67 + ph), 0.55 + 0.3 * cos(t * 0.67 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 26; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(26) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.64;
	p = abs(p) - 0.37;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.53 + time * 0.27, vec3(0.45, 0.43, 0.52), vec3(0.41, 0.36, 0.38), vec3(1.19, 1.22, 1.01), vec3(0.31, 0.08, 0.97));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
