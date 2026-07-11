uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.51; vec2 jc = vec2(-0.60 + 0.3 * sin(t * 1.07 + ph), -0.46 + 0.3 * cos(t * 1.07 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(29) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.28 * cos(sa * 5 + t * 1.16 + ph);
    v = sin((sr - petal) * 8.60);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.50, -0.67) * sin(length(p) * 5.53 - time * 1.30) * 0.23;
	p = fract(p * 1.33) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 3.75 - time * 0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.70 + time * 0.05, vec3(0.42, 0.49, 0.42), vec3(0.39, 0.30, 0.31), vec3(1.40, 0.82, 0.75), vec3(0.30, 0.75, 0.13));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
