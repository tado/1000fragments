uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.68);
    float gsh = hash21(vec2(grow, floor(t * 8.20))) - 0.5;
    float gx = p.x + gsh * 1.11;
    v = sin(gx * 15.78 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.87));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(0.83) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
