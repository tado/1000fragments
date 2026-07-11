uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.83) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 0.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	p = fract(p * 2.78) - 0.5;
	p = rot2(length(p) * 2.50 + time * 0.65) * p;
	p += vec2(-0.30, -0.41) * sin(length(p) * 2.56 - time * 0.96) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.20);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
