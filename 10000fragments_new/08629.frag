uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.35) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.44 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	p = rot2(p.y * -3.30 + time * 0.24) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.24, 0.22, 0.65) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
