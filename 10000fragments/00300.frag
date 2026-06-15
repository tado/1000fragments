uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.66; vec2 jc = vec2(-0.79 + 0.3 * sin(t * 0.24 + ph), 0.26 + 0.3 * cos(t * 0.24 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.20 * cos(sa * 7 + t * 2.73 + ph);
    v = sin((sr - petal) * 17.34);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.49 + time * 0.27, vec3(0.50, 0.49, 0.54), vec3(0.30, 0.33, 0.40), vec3(0.71, 1.00, 0.77), vec3(0.96, 0.73, 0.32));
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
