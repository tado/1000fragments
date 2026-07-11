uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.91 + t * 2.74 + ph) * 0.7;
    float wb = sin(p.y * 7.44 - t * 1.74 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.34;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 14.0) + 0.5) / 14.0;
	p.y += sin(p.x * 4.29 + time * 2.61) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.53, 0.71, 0.95) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
