uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.34;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.23 + 0.05 * sin(t * 2.46 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = rot2(time * 0.33) * p;
	p = sin(p * 2.74 + time * 0.93) * 1.32;
	p *= 2.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.01, vec3(0.44, 0.57, 0.46), vec3(0.33, 0.46, 0.44), vec3(0.72, 1.39, 1.20), vec3(0.42, 0.43, 0.50));
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
