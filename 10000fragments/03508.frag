uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.75) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 1.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.38;
	p = abs(p);
	p = rot2(p.y * -1.14 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.13, vec3(0.48, 0.54, 0.43), vec3(0.45, 0.35, 0.46), vec3(0.86, 0.84, 0.82), vec3(0.25, 0.68, 0.90));
	col = fract(col * 2.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
