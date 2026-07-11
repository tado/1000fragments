uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.54) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(0.98) * p;
	p = abs(p) - 0.34;
	p = fract(p * 2.33) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.22);
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 1.44 + time * 8.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
