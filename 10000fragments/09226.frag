uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.91) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.48 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	p = rot2(length(p) * -3.49 + time * 0.37) * p;
	p *= 1.69;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.23, vec3(0.59, 0.51, 0.43), vec3(0.47, 0.37, 0.38), vec3(0.99, 1.06, 1.15), vec3(0.01, 0.97, 0.32));
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
