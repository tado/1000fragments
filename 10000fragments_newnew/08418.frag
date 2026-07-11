uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.66);
    float gsh = hash21(vec2(grow, floor(t * 9.04))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 17.07 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.04));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 16.4) + 0.5) / 16.4;
	p = rot2(p.y * -3.97 + time * 1.09) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.32, 0.36, 0.25) * (0.19 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
