uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.97 + t * 3.79 + ph) + sin(p.y * 3.81 - t * 0.76 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.33; p = rot2(1.30) * p; }
	p += vec2(-0.70, -0.77) * sin(length(p) * 2.54 - time * 0.97) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.95));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
