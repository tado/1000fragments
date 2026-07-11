uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.81 + t * 1.56 + ph) + sin(p.y * 15.88 - t * 5.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.97) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.33; p = rot2(0.94) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.00));
	col = 0.5 + 0.5 * col;
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.86 + time * 17.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
