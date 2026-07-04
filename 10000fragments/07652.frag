uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.08;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 4.09 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.0 + 0.37 * sin(time * 4.63);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.08));
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.60;
	p = rot2(length(p) * 2.27 + time * 1.49) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.27 + time * 0.27, vec3(0.59, 0.45, 0.47), vec3(0.34, 0.45, 0.36), vec3(0.86, 0.88, 0.74), vec3(0.48, 0.19, 0.85));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
