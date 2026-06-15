uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.68) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.30 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.38) * p;
	p = rot2(time * 1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.28, 1.38, 1.02) + vec3(0.08, 0.23, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
