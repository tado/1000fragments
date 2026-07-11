uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.36);
    float gsh = hash21(vec2(grow, floor(t * 2.12))) - 0.5;
    float gx = p.x + gsh * 0.91;
    v = sin(gx * 19.38 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.05));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.09) * p;
	p *= 1.55;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.03, 0.32), vec3(0.60, 0.80, 0.65), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
