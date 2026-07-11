uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.75 + t * 3.51 + ph) + sin(p.y * 14.76 - t * 5.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.14; p = rot2(2.23) * p; }
	p += vec2(0.68, 0.78) * sin(length(p) * 2.93 - time * 1.89) * 0.33;
	p = rot2(length(p) * 2.09 + time * 0.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.30));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
