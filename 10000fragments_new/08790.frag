uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.53, 0.0)) * 17.18 - t * 4.43 + ph);
    float mb = sin(length(p + vec2(0.53, 0.0)) * 16.80 - t * 4.35 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.63, 0.18, 0.43) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
