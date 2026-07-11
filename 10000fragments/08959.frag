uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.68 + jf * 4.0), cos(t * 0.13 * jf)) * 0.78;
        xs += sin(length(p - im) * 182.99 - t * 9.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.80) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -3.02 + time * 0.86) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.02, vec3(0.52, 0.55, 0.48), vec3(0.49, 0.43, 0.43), vec3(1.15, 0.95, 0.74), vec3(0.48, 0.36, 1.00));
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
