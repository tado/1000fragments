uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.81);
    float gsh = hash21(vec2(grow, floor(t * 7.12))) - 0.5;
    float gx = p.x + gsh * 0.86;
    v = sin(gx * 12.60 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.15));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.69, 0.33, 0.45) * (0.12 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
