uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.23; vec2 jc = vec2(-0.45 + 0.3 * sin(t * 0.25 + ph), 0.70 + 0.3 * cos(t * 0.25 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 34; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(34) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.24 * cos(sa * 5 + t * 2.85 + ph);
    v = sin((sr - petal) * 18.58);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = rot2(length(p) * 2.54 + time * 0.88) * p;
	p = fract(p * 2.40) - 0.5;
	p = rot2(1.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.49 + time * 0.17, vec3(0.51, 0.45, 0.44), vec3(0.35, 0.48, 0.36), vec3(0.85, 0.86, 1.39), vec3(0.46, 0.13, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
