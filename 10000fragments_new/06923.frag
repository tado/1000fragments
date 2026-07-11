uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.83 + t * 3.34 + ph) + sin(p.y * 4.47 - t * 3.34 + ph)
        + sin((p.x + p.y) * 5.16 + t * 3.34 + ph) + sin(length(p) * 10.65 - t * 3.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(2.00) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.71));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
