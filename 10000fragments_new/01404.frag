uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.82 + t * 3.03 + ph) * 0.7;
    float wb = sin(p.y * 14.94 - t * 3.99 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.61;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	p = abs(p);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(0.38) * p; }
	p = fract(p * 2.63) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.28));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
