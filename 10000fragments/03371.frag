uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.75) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p *= 2.25;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.12; p = rot2(1.68) * p; }
	p += vec2(0.26, -0.54) * sin(length(p) * 3.88 - time * 1.87) * 0.35;
	p = rot2(3.03) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.79));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
