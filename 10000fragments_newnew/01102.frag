uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.27;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.14 * sin(t * 2.66 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.83;
    v = 0.5 * (sin(6.0 * cp.x + t * 2.69) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 2.84) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = rot2(0.87) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.71 + time * 0.11, vec3(0.50, 0.56, 0.52), vec3(0.35, 0.44, 0.34), vec3(0.95, 0.74, 0.87), vec3(0.93, 0.41, 0.28));
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.79 + time * 6.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
