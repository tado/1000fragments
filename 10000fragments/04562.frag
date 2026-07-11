uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 10.65 - t * 3.40 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 28.24 - t * 3.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.27, vec3(0.46, 0.52, 0.52), vec3(0.39, 0.31, 0.33), vec3(1.06, 1.07, 1.08), vec3(0.30, 0.36, 0.56));
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
